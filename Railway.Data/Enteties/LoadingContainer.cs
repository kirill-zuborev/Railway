using System;
using System.Collections.Generic;
using System.Text;

namespace Railway.Data.Enteties
{
    public class LoadingContainer
    {
		public Container ContainerType { get; set; }

		public Vector Position { get; set; }

		public double Weight { get; set; }
	}
}
