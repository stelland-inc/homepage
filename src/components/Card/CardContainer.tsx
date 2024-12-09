'use client';
import styles from '@/components/Card/style.module.scss'
// import { projects } from '@/components/Card/data';
import Card from '@/components/Card';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Business from '@/components/Card/Business';
import About from '@/components/Card/About';
import History from '@/components/Card/History';
import Description from '@/components/Card/Description';
import Toonyz from '@/components/Card/Toonyz';

type ProjectComponent = React.FC<{
  progress: number;
  range: [number, number];
  i: number;
  color: string;
}>;

const projectComponents: {
  component: ProjectComponent;
  color: string;
}[] = [
  {
    component: Description,
    color: 'white'
  },
  {
    component: About,
    color: '#FFF0EC'
  },
  {
    // bg-pink-300 f9a8d4
    // #304F72
    component: Business,
    color: '#304F72'
  },
  {
    component: History,
    color: 'white'
  },
  {
    component: Toonyz,
    color: '#FFF0EC'
  }
];


export default function CardContainer() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end']
    })

    return (
     <main ref={container} className={styles.main}>
      {
        projectComponents.map((project, i) => {
          const ProjectComponent = project.component;
          return <Card 
                  key={`p_${i}`} 
                  i={i} 
                  {...project} 
                  progress={scrollYProgress.get()} 
                  range={[i * .25, 1]} 
                  color={project.color}
                  >
                    <ProjectComponent 
                      progress={scrollYProgress.get()}
                      range={[i * .25, 1]}
                      i={i}
                      color={project.color}
                    />
                  </Card>
                })
             }
    </main>
    )
}