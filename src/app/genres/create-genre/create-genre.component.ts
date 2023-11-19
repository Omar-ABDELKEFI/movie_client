// Import necessary Angular modules and types
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Import utility functions and custom validators
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';

// Import genreCreationDTO model and GenresService
import { genreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';

// Decorator to define the component
@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  // Array to store error messages
  errors: string[] = [];

  // Constructor to inject Router and GenresService
  constructor(private router: Router, private genresService: GenresService) { }

  // Initialization logic when the component is created
  ngOnInit(): void {
    // Any initialization logic can be added here if needed
  }

  // Method to save changes and create a new genre
  saveChanges(genreCreationDTO: genreCreationDTO): void {
    // Call the GenresService to create a new genre
    this.genresService.create(genreCreationDTO).subscribe(() => {
      // Navigate to the genres page after successful creation
      this.router.navigate(['/genres']);
    }, error => {
      // Handle errors and display error messages
      this.errors = parseWebAPIErrors(error);
    });
  }
}
