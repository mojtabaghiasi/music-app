import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/entity';
import { UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService){}

    @Post()
    create(@Body() cteateSongDto: CreateSongDto) : Promise<Song>{
        return  this.songsService.create(cteateSongDto);
    }

    @Get()
    findAll(@Query('page' , ParseIntPipe) page: number = 1,
            @Query('limit', ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Song>>{
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginateSongs({page, limit});
    }

    @Get(':id')
    findOne(@Param('id' , new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    }))id: number){
    return this.songsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSongDto: UpdateSongDto): Promise<UpdateResult>{
        return this.songsService.update(id, updateSongDto);
    }

    @Delete(':id')
    delete(id: number): Promise<void>{
        return this.songsService.remove(id);
    }

}
