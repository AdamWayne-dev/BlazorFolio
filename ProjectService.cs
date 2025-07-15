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
                }
            };
        } 
    }
}
