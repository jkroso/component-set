
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

## warning

  you may run into githubs rate limit if you run a lot of these commands in the space of an hour


