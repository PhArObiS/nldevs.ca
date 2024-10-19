import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <h1 className="text-[40px] font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        DEVELOPER
      </h1>
      <div className="font-mono h-full w-full lg:grid lg:grid-cols-3 lg:gap-10 px-10">
        <ProjectCard
          src="/ProjectPHP.png"
          title="Kids Game"
          description="Made a little game in PHP for kids."
        />
        <ProjectCard
          src="/ProjectAndroid.png" 
          title="Delivery Management"
          description="Made a delivery app in Android"
        />
        <ProjectCard
          src="/ProjectAngular.png"
          title="Student Management"
          description="Made a student management app in Angular."
        />
        <ProjectCard
          src="/ProjectCinema.png"
          title="Cinema Management"
          description="Made a cinema ticket reservation."
        />
        <ProjectCard
          src="/ProjectQTwidgets.png"
          title="ToolTips"
          description="Made a Tool Tips in C++ using QT widgets."
        />
        {/* <ProjectCard
          src="/GameDevhooterUE5.png"
          title="GameDev in Unreal Engine"
          description="GameDev tree for Shooter game."
        /> */}
      </div>
    </div>
  );
};

export default Projects;
