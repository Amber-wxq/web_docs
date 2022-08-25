# git 命令
    - git clone 
    - git init
    - git add . 
    - git commit -m "Updated version to latest version"
    - git status 
## 分支
创建
    git branch (branch name)
切换
    git checkout (branch name)
合并
    git merge (branch name)
    

git branch 之后进入的状态 按q进行退出

    例：    
        $ git branch
            * master
              newtest
    
        $ git merge newtest
        在主分支 合并newtest
        合并完就可以删除分支
        git branch -d （branch name）

列出分支
    git branch
删除分支
    git branch -d (branch name)

push

`git push` 直接全部push

## .gitignore

添加 `node_modules/` 或`node_modules` 到`.gitignore`文件以忽略`node_modules`当前文件夹和任何子文件夹中调用的所有目录





git commit -m "feat: 合并master" --no-verify       

changeToolbar







git pull 的时候

本地的代码修改会和git上的有冲突，

操作

```
git stash  //暂存

git pull

git stash pop //取出

//然后解决冲突

```

