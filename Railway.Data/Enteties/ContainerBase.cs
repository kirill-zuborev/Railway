namespace Railway.Data.Enteties
{
	public class ContainerBase
    {
		public double Height { get; set; }

		public double Width { get; set; }

		public double Length { get; set; }

		public double Volume
		{
			get
			{
				return this.Height * this.Width * this.Length;
			}
		}
	}
}
