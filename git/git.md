### 将项目代码库推到远程仓库里面
git init
git remote add origin url(远程仓库的ssh地址\http地址)

### 每次推代码到远程仓库的步骤
1、

### 回滚/撤回代码

1、git log //查看提交记录
2、git reset --hard 版本号  //回滚到某个版本
3、git push -f origin 远程分支  //强制推送到远程仓库

https://blog.csdn.net/u014361280/article/details/124630315?ops_request_misc=&request_id=&biz_id=102&utm_term=git%20%E5%A6%82%E4%BD%95%E6%8B%BF%E5%88%B0%E4%B8%8A%E4%B8%80%E6%AC%A1%E6%8E%A8%E7%9A%84&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-124630315.142^v92^koosearch_v1&spm=1018.2226.3001.4187

### 克隆某一个分支

git clone -b 分支名 仓库地址

### 跟踪某一个分支，以后拉取某一个分支的代码

git branch --set-upstream-to=origin/分支名 本地分支名

