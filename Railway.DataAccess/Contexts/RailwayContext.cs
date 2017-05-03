namespace Railway.DataAccess.Contexts
{
	using Microsoft.EntityFrameworkCore;
	using Railway.Data.Enteties;

	public class RailwayContext : DbContext
	{
		public DbSet<Container> Containers { get; set; }

		public DbSet<Wagon> Wagons { get; set; }
	}
}
