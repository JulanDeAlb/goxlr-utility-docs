import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Multidevice Support',
        Svg: require('@site/static/img/goxlr-fullsize.svg').default,
        description: (
            <>
                You have 2 or more devices?<br/>
                No problem, we got you covered.
            </>
        ),
    }, 
    {
        title: 'Easy to Use',
        Svg: require('@site/static/img/goxlr-utility.svg').default,
        description: (
            <>
                The UI design was modelled around the official application in an attempt to provide a familiar interface for those moving from Windows to other platforms.
            </>
        ),
    },
    {
        title: 'Included API',
        Svg: require('@site/static/img/goxlr-mini.svg').default,
        description: (
            <>
                The Utility can completely controlled via API.<br/>
                The result: nearly endless possibilities.
            </>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
