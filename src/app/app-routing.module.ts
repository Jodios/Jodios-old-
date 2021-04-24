import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConwaysGameOfLifeComponent } from './conways-game-of-life/conways-game-of-life.component';
import { QuickSortComponent } from './sorting/quick-sort/quick-sort.component';
import { BubbleSortComponent } from './sorting/bubble-sort/bubble-sort.component';
import { InsertionSortComponent } from './sorting/insertion-sort/insertion-sort.component';
import { SelectionSortComponent } from './sorting/selection-sort/selection-sort.component';
import { DijkstraComponent } from './pathFinding/dijkstra/dijkstra.component';
import { DoublePendulumComponent } from './physics/double-pendulum/double-pendulum.component';
import { FourierComponent } from './math/fourier/fourier.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"conways-game-of-life", component:ConwaysGameOfLifeComponent},
  {path:"sorting/quick-sort", component: QuickSortComponent},
  {path:"sorting/bubble-sort", component: BubbleSortComponent},
  {path:"sorting/insertion-sort", component: InsertionSortComponent},
  {path:"sorting/selection-sort", component: SelectionSortComponent},
  {path:"path-finding/dijkstra", component: DijkstraComponent},
  {path:"physics/double-pendulum", component: DoublePendulumComponent},
  {path:"maths/fourier", component: FourierComponent},
  {path:"**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
