import { Component, OnInit } from '@angular/core';
import { MusicService } from './services/music.service';
import { Music } from './models/music';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  music = {} as Music;
  musics!: Music[];

  constructor(private musicService: MusicService) {}
  
  ngOnInit() {
    this.getMusics();
  }

  // defini se um funcionario será criado ou atualizado
  saveMusic(form: NgForm) {
    if (this.music.id !== undefined) {
      this.musicService.updateMusic(this.music).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.musicService.saveMusic(this.music).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os funcionarios
  getMusics() {
    this.musicService.getMusics().subscribe((musics: Music[]) => {
      this.musics = musics;
    });
  }

  // deleta uma musica
  deleteMusic(music: Music) {
    this.musicService.deleteMusic(music).subscribe(() => {
      this.getMusics();
    });
  }

  // copia o funcionario para ser editado.
  editMusic(music: Music) {
    this.music = { ...music };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getMusics();
    form.resetForm();
    this.music = {} as Music;
  }

}

