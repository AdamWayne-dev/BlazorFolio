using Blazor_Portfolio_Website.Models;

namespace Blazor_Portfolio_Website.Services
{
    public class ProjectService
    {
        public List<Project> GetProjects()
        {
            return new List<Project>
            {
                new Project
                {
                    Name = "Portfolio website",
                    Description = "A portfolio that contains all of the projects I've completed as well as the ones I'm currently working on.",
                    ImageUrl = "project/images.png",
                    ProjectUrl = "placeholder.com",
                    GitHubUrl = "placeholder.com",
                    Technologies = new List<string> { "C#", "Blazor", "HTML", "CSS" }
                },

                new Project
                {
                    Name = "Handsome Cow's Arcade of Classics",
                    Description = "A collection of classic arcade games that can be played in the browser.",
                    ImageUrl = "project/arcade.png",
                    ProjectUrl = "www.placeholder.com",
                    GitHubUrl = "www.placeholder.com",
                    Technologies = new List<string> {"Blender","Aseprite","Unity", "C#"}
                },

                new Project
                {
                    Name = "Another Fishing Game",
                    Description = "A small fishing game I made in a day using the PICO-8 Engine",
                    ImageUrl = "AnotherFishingGame.png",
                    ProjectUrl = "https://www.lexaloffle.com/bbs/?tid=150377",
                    GitHubUrl = "",
                    Technologies = new List<string> { "Lua", "PICO-8" },
                    EmbedUrl = "https://www.lexaloffle.com/bbs/widget.php?pid=another_fishing_game"
                }
            };
        } 
    }
}
