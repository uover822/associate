build :
	mkdir -p app/data
	mkdir -p app/srv
	cp -r ../../../associate/associate.js app
	cp -r ../../../associate/srv/*.js app/srv
	docker build -t msr-associate:1 .
	docker build -t msr-associate-prod:1 -f Dockerfile-prod .

clean :
	rm *~

.PHONY : build clean
