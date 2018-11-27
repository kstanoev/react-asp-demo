using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class BeersDb : DbContext
    {
        public BeersDb(DbContextOptions<BeersDb> options)
            : base(options)
        {
        }

        public DbSet<Beer> Beers { get; set; }
    }
}
