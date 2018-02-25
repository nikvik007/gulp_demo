const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const script = require('./script');
const style = require('./style');

var devMode = false;

gulp.task('css',function(){
	gulp.src(style)
	.pipe(concat('main.css'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('js',function(){
	gulp.src(script)
	.pipe(concat('script.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.reload({
		stream:true //to reload in background(stream)
	}));		
});

gulp.task('html',function(){
	gulp.src('./src/template/**/*.html')
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.reload({
		stream:true
	}));
});

// to do all the tasks above

gulp.task('build',function(){
	gulp.start(['css','js','html']);	
});

gulp.task('browser-sync',function(){
	browserSync.init(null,{
		open:false,
		server:{
			baseDir:'dist'
		}
	});
});

//to start development server
gulp.task('start',function(){
	devMode = true;
	gulp.start(['build','browser-sync']);
	gulp.watch(['.src/css/**/*.css'],['css']);
	gulp.watch(['.src/js/**/*.js'],['js']);
	gulp.watch(['.src/templates/**/*.html'],['html']);
});

