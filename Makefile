build:
	docker-compose build --no-cache

start:
	docker-compose up 


stop:
	docker-compose down

destroy:
	docker-compose down -v
	docker-compose down --rmi all --volumes --remove-orphans

clean-all1:
	docker stop $(docker ps -aq)
clean-all2:
	docker rm $(docker ps -aq)

