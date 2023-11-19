// Import necessary Angular and material modules
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

// Import actorsMovieDTO model and ActorsService
import { actorsMovieDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

// Decorator to define the component
@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  // Constructor to inject ActorsService
  constructor(private actorsService: ActorsService) { }

  // FormControl for the autocomplete input
  control: FormControl = new FormControl();

  // Input property for selected actors
  @Input()
  selectedActors: actorsMovieDTO[] = [];

  // Array to store actors displayed in autocomplete dropdown
  actorsToDisplay: actorsMovieDTO[] = [];

  // Array of column names to display in the table
  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  // Reference to the MatTable for rendering rows
  @ViewChild(MatTable) table: MatTable<any>;

  // Initialization logic when the component is created
  ngOnInit(): void {
    // Subscribe to value changes in the autocomplete input
    this.control.valueChanges.subscribe(value => {
      // Call the ActorsService to search for actors by name
      this.actorsService.searchByName(value).subscribe(actors => {
        // Update the actorsToDisplay array with search results
        this.actorsToDisplay = actors;
      });
    });
  }

  // Event handler when an option is selected in the autocomplete dropdown
  optionSelected(event: MatAutocompleteSelectedEvent) {
    // Log the selected option value
    console.log(event.option.value);

    // Clear the input value after selection
    this.control.patchValue('');

    // Check if the selected actor is already in the list
    if (this.selectedActors.findIndex(x => x.id == event.option.value.id) !== -1) {
      return;
    }

    // Add the selected actor to the list
    this.selectedActors.push(event.option.value);

    // Render the rows in the table
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  // Method to remove an actor from the selected list
  remove(actor) {
    // Find the index of the actor in the selected list
    const index = this.selectedActors.findIndex(a => a.name === actor.name);

    // Remove the actor from the list
    this.selectedActors.splice(index, 1);

    // Render the rows in the table
    this.table.renderRows();
  }

  // Method to handle the drag-and-drop event in the table
  dropped(event: CdkDragDrop<any[]>) {
    // Find the previous index of the dragged actor in the selected list
    const previousIndex = this.selectedActors.findIndex(actor => actor === event.item.data);

    // Move the actor in the selected list to the new position
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);

    // Render the rows in the table
    this.table.renderRows();
  }

}
