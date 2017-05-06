using Railway.Data.Enteties;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Railway.Domain
{
    public class LoadingMainContainer
    {
		private readonly GoalFunction goalFunction;

		public LoadingMainContainer(
			GoalFunction goalFunction)
		{
			this.goalFunction = goalFunction;
		}

		public void Load(
			ContainerBase mainContainer,
			Dictionary<Container, int> containers
			)
		{
			HashSet<LoadingContainer> loadedContainers = new HashSet<LoadingContainer>();
			IList<Vector> startCoord = new List<Vector>
			{
				new Vector(0, 0, 0)
			};

			foreach (var item in containers)
			{
				var loadingContainer = new LoadingContainer()
				{
					ContainerType = item.Key,
					Position = GetCoord(startCoord)
				};

				while (item.Value > 0 && TryAddContainer(mainContainer, loadingContainer, loadedContainers))
				{
					loadedContainers.Add(loadingContainer);
					containers[item.Key]--;

					startCoord.Add(loadingContainer.Position.Shift(loadingContainer.ContainerType.Length, 0, 0));
					startCoord.Add(loadingContainer.Position.Shift(0, loadingContainer.ContainerType.Width, 0));
					startCoord.Add(loadingContainer.Position.Shift(loadingContainer.ContainerType.Length, loadingContainer.ContainerType.Width, 0));
					startCoord.Add(loadingContainer.Position.Shift(0, 0, loadingContainer.ContainerType.Height));

					startCoord.Remove(loadingContainer.Position);
				}
			}
		}

		private bool TryAddContainer(ContainerBase mainContainer, LoadingContainer loadingContainer, HashSet<LoadingContainer> loadedContainers)
		{
			if (loadingContainer.Position.Y != 0 && CheckContainersNotOnGround(mainContainer, loadingContainer, loadedContainers))
			{
				return true;
			}

			return false;
		}

		private Vector GetCoord(IList<Vector> startCoord)
		{
			Vector result = new Vector();
			double minLenght = startCoord.First().ToCenter;

			foreach (var item in startCoord)
			{
				if (minLenght <= item.ToCenter)
				{
					minLenght = item.ToCenter;
					result = item;
				}
			}

			return result;
		}

		private void AddContainer(ContainerBase mainContainer, HashSet<LoadingContainer> loadedContainers, Container key, IList<Vector> startCoord)
		{

		}

		private bool CheckContainersNotOnGround(ContainerBase mainContainer, LoadingContainer loadingContainer, HashSet<LoadingContainer> loadedContainers)
		{
			var ppp = new Dictionary<Vector, bool>();

			ppp.Add(loadingContainer.Position.Shift(loadingContainer.ContainerType.Length, 0, 0), false);
			ppp.Add(loadingContainer.Position.Shift(0, loadingContainer.ContainerType.Width, 0), false);
			ppp.Add(loadingContainer.Position.Shift(loadingContainer.ContainerType.Length, loadingContainer.ContainerType.Width, 0), false);

			foreach (var item in loadedContainers)
			{
				if (ppp.Values.All(c => c))
				{
					return true;
				}

				foreach (var point in ppp)
				{
					if (item.Position.X < point.Key.X && item.Position.X + item.ContainerType.Length < point.Key.X
					&& item.Position.Z < point.Key.Z && item.Position.Z + item.ContainerType.Width < point.Key.Z
					&& item.ContainerType.Height == point.Key.Y)
					{
						ppp[point.Key] = true;
					}
				}
					
			}

			if (ppp.Values.All(c => c))
			{
				return true;
			}

			return false;
		}
    }
}
