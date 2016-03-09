var fs = require("fs"),
	path =require("path"),
	exec = require('sync-exec'),
	// config = require("./config.js"),
	content = "",
	format = "%s";

var DailyCommits = {
	// srcpath : "", //config.source_path,
	getCommits : function(srcpath){
		// srcpath = this.srcpath;
		var directories = this.getDirectories(srcpath);
		var commits = this.getCommitsFromDir(directories, srcpath);
		return commits;
	},
	getDirectories : function(srcpath){
		return fs.readdirSync(srcpath).filter(function(file){
			return fs.statSync(path.join(srcpath, file)).isDirectory();
		});
	},
	getCommitsFromDir : function(dirarr, srcpath){
		for (var i=0, ilen = dirarr.length; i< ilen; i++){
			var gitit = exec("cd "+srcpath + dirarr[i] + " && git log --since=yesterday --pretty=format:"+format);
			if(!gitit.stderr && gitit.stdout){
				content+=dirarr[i]+" : "+gitit.stdout.replace("\n", " and ")+"\n";
			}
		}
		return content;
	}
}

module.exports = DailyCommits;