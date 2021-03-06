
var lift = require('lift-result/cps')
var ghtag = lift(require('github-latest'))
var Result = require('result')
var log = require('./logger')
var fs = require('fs')

exports.parseKeyValue = function(dep){
	// github shorthand
	var m = /^([-.\w]+)\/([-.\w]+)(?:@([-.\w]+|\d+\.\d+\.\d+))?$/.exec(dep)
	if (m) {
		var key = m[1] + '/' + m[2]
		if (m[3]) return Result.wrap([key, m[3]])
		return exports.latest(m[1], m[2]).then(function(tag){
			return [key, tag || '*']
		})
	}

	throw new Error('search not implemented')
}

exports.latest = function(user, repo){
	log.info('fetching', 'latest tag for %s/%s', user, repo)
	return ghtag(user, repo)
}

exports.getDeps = function(file){
	if (!fs.existsSync(file)) throw new Error('no component.json')
	return JSON.parse(fs.readFileSync(file, 'utf8'))
}

/**
 * add an entry to the component.json file
 *
 * @param {String} key
 * @param {String} url
 */

exports.add = function(key, tag, opts){
	var json = exports.getDeps(opts.file)

	// --development
	if (opts.development) {
		var deps = json.development || (json.development = {})
	} else {
		var deps = json.dependencies || (json.dependencies = {})
	}

	deps[key] = tag
	fs.writeFileSync(opts.file, JSON.stringify(json, null, 2))
}