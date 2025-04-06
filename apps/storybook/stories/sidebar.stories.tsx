import {
  HomeIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@lorenz/ui/sidebar";
import { SidebarLayout } from "@lorenz/ui/sidebar-layout";

const meta = {
  title: "Layout/Sidebar",
  parameters: {
    layout: "fullscreen",
  },
  component: SidebarLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: (
      <Sidebar>
        <SidebarBody>
          <SidebarSection>
            <SidebarItem>
              <HomeIcon />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>
            <SidebarItem current>
              <Square2StackIcon />
              <SidebarLabel>Events</SidebarLabel>
            </SidebarItem>
            <SidebarItem>
              <TicketIcon />
              <SidebarLabel>Orders</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
    ),
    navbar: <div />,
  },
  render: (args) => {
    return (
      <SidebarLayout sidebar={args.sidebar} navbar={args.navbar}>
        <div>
          <h1>Content</h1>
          <p>This is the main content area.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            ante id augue posuere vestibulum quis et diam. Ut ornare eros quis
            tempor auctor. Donec viverra ante sit amet dolor dictum
            sollicitudin. Phasellus ornare consectetur urna, ac scelerisque
            dolor condimentum ut. Praesent id lorem pulvinar, rutrum ligula
            eget, interdum massa. Praesent suscipit auctor consectetur. Proin
            vel aliquet felis, sit amet mattis erat. Nam egestas malesuada
            finibus. Duis blandit mi vel magna sollicitudin ornare. Sed interdum
            semper nibh et hendrerit. Quisque ac rutrum ante. Sed vitae ex in
            magna consequat eleifend. Fusce elit massa, ultrices a nibh ut,
            ornare posuere ligula. Nulla facilisi. Nullam eleifend nisl vel
            dolor elementum, at sollicitudin orci suscipit. Suspendisse pretium
            urna vitae tincidunt dictum. Curabitur consequat in ligula ut
            tristique. Praesent a rhoncus ipsum. Phasellus vitae augue
            ultricies, feugiat tellus nec, dictum tortor. Maecenas eu
            scelerisque leo. Aliquam et tellus felis. Morbi ut feugiat justo.
            Maecenas urna erat, vestibulum sed luctus eget, mattis sit amet
            odio. Cras ultricies lacus in massa consectetur, ac ultrices neque
            laoreet. Suspendisse sed finibus tellus. Nullam sollicitudin ut
            risus et ultrices. Integer ullamcorper maximus ante sit amet
            placerat. Duis aliquet sem tortor, malesuada cursus purus viverra a.
            Integer finibus facilisis congue. Maecenas interdum quam quam, id
            molestie nunc aliquam dignissim. In scelerisque condimentum nunc eu
            aliquam. Donec at vulputate erat. Donec finibus, lorem at ornare
            efficitur, turpis est tincidunt lectus, eget lacinia nulla risus nec
            purus. Pellentesque eget diam sollicitudin, malesuada neque non,
            volutpat felis. Morbi sed venenatis massa, eleifend lacinia nisl.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Vivamus vel nisl ante. Donec faucibus tortor sit amet dictum
            eleifend. Fusce nec vestibulum mi. Morbi sagittis euismod nunc, at
            placerat sem sodales vitae. Sed cursus, sem vitae lobortis faucibus,
            leo erat aliquam odio, sit amet egestas nisl sapien ac nibh. Ut
            porttitor non arcu non fringilla. Integer ut lectus a justo
            hendrerit sodales vel at libero. Cras efficitur condimentum
            vehicula. Curabitur id ligula eget enim venenatis sodales. Sed non
            est nec nunc ultrices finibus vitae vel magna. Maecenas ultrices,
            ante at hendrerit elementum, lacus sapien congue tellus, eu ultrices
            dui nunc sit amet felis. Nam porta porttitor mauris at auctor.
            Phasellus nec metus sit amet risus facilisis imperdiet vel in leo.
            Ut vestibulum risus non pretium bibendum. Quisque nec pellentesque
            mi. Vivamus a ultricies mi. Donec rhoncus faucibus ante, fermentum
            auctor ligula euismod eu. Mauris hendrerit sapien nec enim malesuada
            mollis. In eu facilisis felis, ac blandit odio. Suspendisse faucibus
            leo quam, ut suscipit sapien lobortis vel. Donec faucibus at est a
            facilisis.
          </p>
        </div>
      </SidebarLayout>
    );
  },
};
