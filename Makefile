test:
ifdef APIKEY
	@echo "apikey: $(APIKEY)"
	@NODE_ENV=test APIKEY=$(APIKEY) ./node_modules/mocha/bin/mocha --harmony --timeout 6s -R spec test/
else
	@echo "ERROR: apikey is mandatory"
endif

.PHONY: test
