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
  // {
  //   component: Description,
  //   color: 'white'
  // },
  {
    component: About,
    color: '#FFF0EC'
  },
  {
    component: Business,
    color: '#FFF0EC'
  },
  {
    component: History,
    color: 'white'
  },
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
                  // {...project} 
                  color={project.color}
                  progress={scrollYProgress.get()} 
                  range={[i * .25, 1]} 
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