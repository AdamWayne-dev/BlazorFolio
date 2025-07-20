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
                    ImageUrl = "",
                    ProjectUrl = "",
                    GitHubUrl = "https://github.com/AdamWayne-dev/BlazorFolio",
                    Technologies = new List<string> { "C#", "Blazor", "HTML", "CSS" }
                },

                new Project
                {
                    Name = "Handsome Cow's Arcade of Classics - Work in progress",
                    Description = "A collection of classic arcade games that can be played in the browser.",
                    ImageUrl = "",
                    ProjectUrl = "",
                    GitHubUrl = "",
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
                    EmbedUrl = "https://www.lexaloffle.com/bbs/widget.php?pid=another_fishing_game",
                    EmbedNotes = "This game is embedded using the PICO-8 widget. You can play it directly in the browser." + "<br />" +
                                 "The controls are: Arrow keys to move, Z to cast, down arrow to reel in the fish when the cursor hovers over the green / orange / red zone." + "<br />" +
                                 "You can sell your fish at the barrel down by the sign with the money symbol. This will give you experience. Your character will change outfits are certain levels."

                }
            };
        } 
    }
}
