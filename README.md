### Running docker
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

### Solution for issues faced during starting docker

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
