
var Promise = require('laissez-faire/full')
  , ghtag = require('github-latest')
  , log = require('./logger')
  , fs = require('fs')

exports.getDeps = getDeps
exports.add = add

exports.parseKeyValue = function(dep){
	// github shorthand
	var m = /^([-.\w]+)\/([-.\w]+)(?:@([-.\w]+|\d+\.\d+\.\d+))?$/.exec(dep)
	if (m) {
		var key = m[1] + '/' + m[2]
		if (m[3]) return new Promise().write([key, m[3]])
		return exports.latest(m[1], m[2]).then(function(tag){
			return [key, tag]
		})
	} else {
		throw new Error('search not implemented')
	}
}

exports.latest = function(user, repo){
	var p = new Promise
	log.info('fetching', 'latest tag for %s/%s', user, repo)
	ghtag(user, repo, function(e, tag){
		if (e) log.info('error', 'unable to find the latest tag for %s/%s (%s)', user, repo, e.message)
		p.write(tag || 'master')
	})
	return p
}

function getDeps(file){
	if (!fs.existsSync(file)) throw new Error('no component.json')
	return JSON.parse(fs.readFileSync(file, 'utf8'))
}

/**
 * add an entry to the component.json file
 * 
 * @param {String} key
 * @param {String} url
 */

function add(key, tag, opts){
	var json = getDeps(opts.file)

	// --development
	if (opts.development) {
		var deps = json.development || (json.development = {})
	} else {
		var deps = json.dependencies || (json.dependencies = {})
	}

	deps[key] = tag
	fs.writeFileSync(opts.file, JSON.stringify(json, null, 2))
}