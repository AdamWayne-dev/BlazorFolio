namespace Blazor_Portfolio_Website.Models
{
    public class Project
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string ProjectUrl { get; set; } = string.Empty;
        public string GitHubUrl { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new List<string>();
        public string? EmbedUrl { get; set; }
        public string EmbedNotes { get; set; } = string.Empty;
    }
}
