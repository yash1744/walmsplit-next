<div align="center">

  <img  style="display: block; margin: 0 auto; height:200px; width:200px" src="https://github.com/yaswanthtondepu/Splitzy/blob/main/public/splitzy.jpg"></img>
  
</div>

<a href="https://splitzyy.vercel.app/" >
  
  <h1 align="center">Splitzy</h1>
</a>

<p align="center">
  An Easy Way to Manage Your Expenses
</p>



<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#usage"><strong>Usage</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>




# Features

- Effortlessly Split and Share Your Expenses via Splitwise directly on the web

  
# Usage
To use Splitzy, got to [Splitzy](https://splitzyy.vercel.app/) follow these steps:

1. Login with your Splitwise account to start using app.
2. Go to the Walmart orders page.
3. Copy the page source of a purchase.
4. Paste the page source in the welcome page of app.
5. Select Friends you want to Split with and Done...
6. You can also add your own custom expenses and split them with your friends.

# Setting Up Locally

To set up locally, you'll need to clone the repository, copy the `.env.template` contents to `.env.local` file and  set up the following environment variables:


- `NEXT_PUBLIC_SPLITWISE_API_TOKEN` - your Splitwise consumer key (you can get one [here](https://secure.splitwise.com/apps))
- `DB_URI` - your MongoDB URI 

- `CIPHER_KEY` - Your nodejs crypto module key 
- `CIPHER_IV` - Your nodejs crypto module IV
- `CIPHER_ALGO` - Your nodejs crypto module Algorithm
- `JWT_SECRET` - your jwt secret which can be any strong string

- `SPLITWISE_CONSUMER_KEY` - your Splitwise consumer key (you can get one [here](https://secure.splitwise.com/apps))
- `SPLITWISE_CONSUMER_SECRET` - your Splitwise consumer secret (you can get one [here](https://secure.splitwise.com/apps))
- `SPLITWISE_REDIRECT_URI` - your Splitwise callback url (you can get one [here](https://secure.splitwise.com/apps))




# Tech Stack
Splitzy is built using the following technologies:

- [Next.js](https://nextjs.org/)  : A framework for building web pages
- [MongoDB](https://www.mongodb.com/) : A NoSQL database for caching the friends and group of users
- [Splitwise APIs](https://dev.splitwise.com/) : Integration with Splitwise for splitting expenses
- [Shadcn-UI](https://ui.shadcn.com/) : Design components for a great user experience
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles

# License
This project is licensed under the MIT License.

# Acknowledgements
We would like to thank [shadcn](https://github.com/shadcn) for providing excellent design components that enhance the user interface.

# Contributing
We welcome contributions to WalmartSplit. To contribute, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and test them thoroughly.
- Commit your changes and push them to your forked repository.
- Open a pull request with a clear description of your changes.
