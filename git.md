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
