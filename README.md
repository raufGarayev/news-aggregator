# News Aggregator

## Important notes (Docker documentation is down)

- APIs that are used: NewsAPI.org, The Guardian, New York Times. Thanks for providing these sources.
- Errors appeared by news apis can be due to api limitation. (Mostly NewsAPI)
- Even if application has single page, there is still page directory. Because i think that's a standart structure of react application.
- Login credentials are static and user preferences is saved in local storage. I could make a nestjs backend for it but as it is mentioned in task it is a front-end project so i didn't see any necessity for it.
- Reason of using ContextAPI while there is already Redux: I am using ContextAPI in my applications mostly for saving user data. Since we always should load the user data more faster than anything. Even if user data is static and local here, i just wanted to show the best approach for a real world application.

## Docker documentation

I provided Dockerfile and docker-compose.yaml files just to make your work easier. Run command: 
```docker
docker-compose up --build
```
and you are good to go!

If it is required to change docker port or image name you can do it in docker-compose.yaml file.

Default ports: 3000:3000
Default image name: news