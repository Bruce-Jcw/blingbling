git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
test:
	@echo ""
	@echo "make test-ios             Test sample for iOS"
	@echo "make test-ios-safari      Test sample for iOS Safari"
	@echo "make test-android         Test sample for Android"
	@echo "make test-android-chrome  Test sample for Android Chrome"
	@echo "make test-pc              Test sample for PC"
test-ios: install
	macaca doctor
	platform=ios macaca run --verbose
test-ios-safari: install
	macaca doctor
	browser=safari macaca run --verbose
test-android-chrome: install
	macaca doctor
	browser=chrome macaca run --verbose
test-android: install
	macaca doctor
	platform=android macaca run --verbose
test-pc:
	macaca doctor
	macaca run --verbose
travis-pc:
	npm install macaca-electron --save-dev
	${npm_bin}/macaca doctor
	${npm_bin}/macaca run --no-window
travis: install travis-pc
	@echo travis passed
travis-android: install
	npm install macaca-android --save-dev
	${npm_bin}/macaca doctor
	platform=android ${npm_bin}/macaca run --verbose 
travis-ios: install
	npm install macaca-ios --save-dev
	${npm_bin}/macaca doctor
	platform=ios ${npm_bin}/macaca run --verbose
jshint:
	@${npm_bin}/jshint .
.PHONY: test
