---
title: "A*"
parent: Motion Planning
nav_order: 1
---

# A*
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## ▪ Overview
{: #overview }

A* (pronounced "A-star") searches a graph for a path from a start node to a goal. In a grid map, nodes can represent cells and edges represent allowed moves between neighboring cells. Edge costs can describe distance or a penalty for traversing a region.

## ▪ Core Idea
{: #core-idea }

A* prioritizes nodes using:

$$
f(n) = g(n) + h(n)
$$

- **$$g(n)$$:** the lowest cost found so far from the start to node $$n$$.
- **$$h(n)$$:** a heuristic estimate of the remaining cost to the goal.
- **$$f(n)$$:** the estimated total cost of a path through $$n$$.

Setting $$h(n)=0$$ gives **Dijkstra's algorithm**, which explores according to accumulated cost alone. A useful heuristic guides exploration toward the goal.

## ▪ Search Steps
{: #search-steps }

1. Put the start in a priority queue with $$g=0$$; initialize other costs to infinity.
2. Remove the queued node with the smallest $$f$$. If it is the goal, reconstruct the path using stored parent links.
3. For each valid neighbor, compute the candidate cost through the current node.
4. If this cost improves the neighbor's $$g$$, update its cost and parent, then add it to the queue or update its priority. Reopen an already expanded node when necessary.
5. Repeat until the goal is removed or the queue becomes empty, indicating no path exists in the searched graph.

## ▪ Choosing a Heuristic
{: #choosing-a-heuristic }

For a four-connected grid with unit movement costs, **Manhattan distance** is a suitable choice:

$$
h(n) = |x_n-x_g| + |y_n-y_g|.
$$

It measures the obstacle-free horizontal and vertical steps to the goal. Diagonal movement or different edge costs require a compatible heuristic.

On a finite graph with nonnegative edge costs, A* finds a minimum-cost path using an **admissible** heuristic that never overestimates the remaining cost, with $$h(\mathrm{goal})=0$$, and reopening when cheaper paths appear. A **consistent** heuristic additionally satisfies $$h(n) \leq c(n,m)+h(m)$$ for every edge, where $$c(n,m)$$ is the cost of moving from $$n$$ to $$m$$. This avoids reopening expanded nodes.

## ▪ Role in Robotics
{: #role-in-robotics }

The result is optimal within the chosen graph and cost model. A robot's footprint and motion constraints must be reflected in valid states and edges before a grid path can be executed safely. See [Occupancy Grids & Costmaps]({% link docs/Navigation/occupancy_grids_and_costmaps.md %}) for environmental representations used in navigation.

## ▪ References
{: #references }

- Steven M. LaValle, *Planning Algorithms*: [Dijkstra's algorithm](https://lavalle.pl/planning/node44.html) and [A-star](https://lavalle.pl/planning/node45.html).
- Zhang et al., [A* Search with Inconsistent Heuristics](https://ijcai.org/proceedings/2009/111), IJCAI 2009.
