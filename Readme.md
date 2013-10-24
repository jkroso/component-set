
# component-set

  add dependencies to component.json

```
  Usage: component-set [options] <pkg>

  Options:

    -h, --help         output usage information
    -d, --development  add as a development dependency

  Examples:

    # explicit
    $ component set jkroso/emitter
```

# component-update

  update all dependencies to their latest tag. Note: this is a json only update. You will still need to run the below commands to actually download them.

```
rm -r components
component install
```

```
 Usage: component-update [options]

  Options:

    -h, --help         output usage information
    -d, --development  don't update production dependencies
    -p, --production   don't update development dependencies
```

# installation

	$ npm install component-set -g

## Rate limiting

  If you find yourself running into githubs rate limit, (100requests/hr) you should consider exposing your github login details with the environment variables "GITHUB_USERNAME" and "GITHUB_PASSWORD" in order to raise your limit to 5000requests/hr.

  I do it in my .bashrc file with:

  ```bash
export GITHUB_USERNAME='jkroso'
export GITHUB_PASSWORD='xxx'
```
