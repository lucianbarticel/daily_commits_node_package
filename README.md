USAGE:

npm install git+ssh://git@github.com/lucianbarticel/daily_commits_node_package.git

var latest_commits = require("my_latest_commits");

var commits = latest_commits.getCommits("/Users/lucian/Projects/");