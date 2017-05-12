namespace Railway.Data.Enteties
{
	using System;

	public struct Vector
	{
		private readonly double _x;
		private readonly double _y;
		private readonly double _z;

		public double X
		{
			get
			{
				return _x;
			}
		}

		public double Y
		{
			get
			{
				return _y;
			}
		}

		public double Z
		{
			get
			{
				return _z;
			}
		}

		public double ToCenter
		{
			get
			{
				return Math.Sqrt(Math.Pow(this.X, 2) + Math.Pow(this.Y, 2) + Math.Pow(this.Z, 2));
			}
		}

		public Vector(double x, double y, double z)
		{
			_x = x;
			_y = y;
			_z = z;
		}

		public Vector Shift(double deltaX, double deltaY, double deltaZ)
		{
			return new Vector(this.X + deltaX, this.Y + deltaY, this.Z + deltaZ);
		}
	}
}
