import { errorMessage } from "./functions/errorMessage.js";
import { carousel } from "./functions/carousel.js";

const loader = document.querySelector(".loader");

const baseUrl = "https://cerchiostudio.mathildeelinor.no/wp-json/wp/v2/posts";
const latestPost = baseUrl + "?per_page=12&_embed";

// Fetch & display latest 12 posts with carousel
async function getLatestPosts() {
  try {
    const blogPosts = await (await fetch(latestPost)).json();
    loader.style.display = "none";

    displayLatestPosts(blogPosts);
    carousel();
  } catch (error) {
    errorMessage();
  }
}

getLatestPosts();

// Display latest blogposts
function displayLatestPosts(blogPosts) {
  const slideOne = document.querySelector(".slide-one");
  const slideTwo = document.querySelector(".slide-two");
  const slideThree = document.querySelector(".slide-three");

  for (let i = 0; i < blogPosts.length; i++) {
    // Convert date
    const date = new Date(blogPosts[i].date).toLocaleDateString("utc", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    // Show 4 blogposts in the three slides
    if (i <= 3) {
      slideOne.innerHTML += `
                              <a href="blogpost.html?id=${blogPosts[i].id}">
                              <div class="post-card" style="background-image: url('${blogPosts[i]._embedded["wp:featuredmedia"]["0"].source_url}')">
                                <div class="pc-background">
                                  <h2>${blogPosts[i].title.rendered}</h2>
                                  <h3>${date}</h3>
                                </div>
                              </div>
                              </a>
                            `;
    } else if (i <= 7) {
      slideTwo.innerHTML += `
                              <a href="blogpost.html?id=${blogPosts[i].id}">
                              <div class="post-card" style="background-image: url('${blogPosts[i]._embedded["wp:featuredmedia"]["0"].source_url}')">
                                <div class="pc-background">
                                  <h2>${blogPosts[i].title.rendered}</h2>
                                  <h3>${date}</h3>
                                </div>
                              </div>
                              </a>
                              `;
    } else if (i <= 11) {
      slideThree.innerHTML += `
                                <a href="blogpost.html?id=${blogPosts[i].id}">
                                <div class="post-card" style="background-image: url('${blogPosts[i]._embedded["wp:featuredmedia"]["0"].source_url}')">
                                  <div class="pc-background">
                                    <h2>${blogPosts[i].title.rendered}</h2>
                                    <h3>${date}</h3>
                                  </div>
                                </div>
                                </a>
                                `;
    }
  }
}
