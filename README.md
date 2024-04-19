# Livewell Coding Challenge

## To run

Clone this repo then run
`npm install` to install all the packages
`npm run dev` to run locally

## Things I can do better to optimize the solution

- Hosting the service (Lets see if I can get this done before 5pm)
- Adding protected routing for the authentication
- Using .env file for my firebase config (security reasons ofc-- just rushed)
- Better code commenting (Also in rush)
- Using Redux for state managment instead of ReactContext
- How I would get the images onto the application (general implementation)
  - Firstly I find a cloud uploading service that hosts images (like cloudinary)
  - Upload the image and then store the returning url in my firebase messages as a url link
  - Then I can write a conditional statement that said if image then return a img tag else return the message text
- I know the UI is very barebones HTML with the base Next styling, I would have used a material library like ChakraUI or MantineUI to make it look neater, but with exams it was lower priority than getting functionality correct
