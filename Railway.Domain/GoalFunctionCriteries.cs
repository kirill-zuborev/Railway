namespace Railway.Domain
{
	using Railway.Data.Enteties;
	using System.Linq;
	using System.Collections.Generic;

	public static class GoalFunctionCriteries
    {
		public static double VolumeDifference<T>(T wagon, IDictionary<LoadingContainer, int> containers) where T : ContainerBase
		{
			return containers.Aggregate(0D, (accom, val) => accom + val.Key.ContainerType.Volume * val.Value);
		}

		public static double IdenticContainersInRow<T>(T wagon, IList<LoadingContainer> containers) where T : ContainerBase
		{
			//TODO: Add counter containers in a row;
			return 0;
		}

	}
}
