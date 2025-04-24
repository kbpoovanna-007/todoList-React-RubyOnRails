## Running docker
- First clone the repo using 'git clone'
- create a .env file to store rails master key
  ```
  RAILS_MASTER_KEY=
  ```
- Build and start the containers
  ```
  docker-compose build
  docker-compose up
  ```

## Solution for issues faced during starting docker

- Remove all containers and volumes
  `docker-compose down -v`

- Prune any dangling images and volumes
  ```
  docker system prune -a
  docker volume prune
  ```
- Build the docker image once again ignoreing cache and run
  ```
  docker-compose build --no-cache
  docker-compose up
  ```

- Also if there is a conflict with a port number...either the process can be killed or the port number can be changed.
- can be checked using the command `sudo lsof -i :portno`



## Dockerizing steps
1. Create and config the below files
	- backend/Dockerfile
	- frontend/Dockerfile
	- config ./docker-compose.yml

2. update to change urls to accept requests from the frontend in cors.rb, and other port details 
	- backend/config/database.yml
	- backend/config/initializers/cors.rb


3. cd backend
	- create a master key in a file master.key, by running the below command
	`EDITOR=nano rails credentials:edit`

4. update the API_URL in api.js

5. Touch ./.env and paste the master key as stored in master.key in backend/config
		`RAILS_MASTER_KEY=your_master_key_value`

6. build and run the application
	```
	docker-compose build 
	docker-compose up
	```

