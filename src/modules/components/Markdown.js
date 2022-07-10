import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { Box, Typography, Link } from '@mui/material';

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: (props) => (
        <Box component="li" sx={{ mt: 1 }}>
          <Typography component="span" {...props} />
        </Box>
      ),
    },
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
