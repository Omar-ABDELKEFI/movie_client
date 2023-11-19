// Import necessary Angular modules and types
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// Import actorDTO model and ActorsService
import { actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

// Decorator to define the component
@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  // Constructor to inject ActorsService
  constructor(private actorsService: ActorsService) { }

  // Array to store actors
  actors: actorDTO[];

  // Array of column names to display in the table
  columnsToDisplay = ['name', 'actions'];

  // Total number of records for pagination
  totalAmountOfRecords;

  // Current page and page size for pagination
  currentPage = 1;
  pageSize = 5;

  // Initialization logic when the component is created
  ngOnInit(): void {
    // Load data when the component is initialized
    this.loadData();
  }

  // Method to load actors data from the service
  loadData(): void {
    this.actorsService.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<actorDTO[]>) => {
      // Set the actors array with the response body
      this.actors = response.body;

      // Set the total amount of records for pagination
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  // Method to update pagination parameters and reload data
  updatePagination(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  // Method to delete an actor by ID
  delete(id: number): void {
    this.actorsService.delete(id).subscribe(() => {
      // Reload data after deletion
      this.loadData();
    });
  }

}
