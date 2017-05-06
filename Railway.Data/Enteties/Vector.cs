using System;
using System.Collections.Generic;
using System.Text;

namespace Railway.Data.Enteties
{
	public struct Vector
	{
		public double X { get; set; }
		public double Y { get; set; }
		public double Z { get; set; }

		public Vector(double x, double y, double z)
		{
			X = x;
			Y = y;
			Z = z;
		}

		public Vector Shift(double deltaX, double deltaY, double deltaZ)
		{
			return new Vector(this.X + deltaX, this.Y + deltaY, this.Z + deltaZ);
		}

		public double ToCenter
		{
			get
			{
				return Math.Sqrt(Math.Pow(this.X, 2) + Math.Pow(this.Y, 2) + Math.Pow(this.Z, 2));
			}
		}
	}
}
