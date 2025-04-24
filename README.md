# Running docker
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

# If facing any issues while running docker

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
