REPORTER=spec

test:
	@node_modules/mocha/bin/_mocha \
		--bail \
		--reporter $(REPORTER)

.PHONY: test