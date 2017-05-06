using Railway.Data.Enteties;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Railway.Domain
{
    public class GoalFunction
    {
		private readonly IList<Tuple<double, Func<ContainerBase, IDictionary<LoadingContainer, int>, double>>> criteria;

		public GoalFunction(IList<Tuple<double, Func<ContainerBase, IDictionary<LoadingContainer, int>, double>>> criteria)
		{
			this.criteria = criteria;
		}

		public double GetGoalFunctionValue(ContainerBase mainContainer, IDictionary<LoadingContainer, int> containers)
		{
			return criteria.Sum(c => c.Item1 * c.Item2(mainContainer, containers));
		}
    }
}
