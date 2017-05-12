namespace Railway.Data.Enteties
{
    public class LoadingContainer
    {
		public Container ContainerType { get; set; }

		public Vector Position { get; set; }

		public BlockOrientation Orientation { get; set; }

		public double Weight { get; set; }
	}
}
