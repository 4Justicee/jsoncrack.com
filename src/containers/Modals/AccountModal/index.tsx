import React from "react";
import {
  Modal,
  Group,
  Button,
  Avatar,
  Text,
  Divider,
  ModalProps,
  Paper,
  Badge,
} from "@mantine/core";
import { IoRocketSharp } from "react-icons/io5";
import { gaEvent } from "src/lib/utils/gaEvent";
import useModal from "src/store/useModal";
import useUser from "src/store/useUser";

export const AccountModal: React.FC<ModalProps> = ({ opened, onClose }) => {
  const user = useUser(state => state.user);
  const setVisible = useModal(state => state.setVisible);
  const logout = useUser(state => state.logout);

  const username =
    user?.user_metadata.full_name || user?.user_metadata.display_name || user?.user_metadata.name;

  return (
    <Modal title={`Hello, ${username}!`} opened={opened} onClose={onClose} centered>
      <Paper p="md">
        <Group>
          <Avatar src={user?.user_metadata.avatar_url} size={94}>
            JC
          </Avatar>
          <div>
            <Text fz="lg" tt="uppercase" fw={700}>
              {username}
            </Text>

            <Group gap={10} mt={3}>
              <Text fz="xs" c="dimmed">
                {user?.email}
              </Text>
            </Group>

            <Group gap={10} mt={5}>
              <Text fz="xs" c="dimmed">
                <Badge
                  size="sm"
                  variant="dot"
                  color="dark"
                  gradient={{ from: "#8800fe", to: "#ff00cc", deg: 35 }}
                >
                  Free
                </Badge>
              </Text>
            </Group>
          </div>
        </Group>
      </Paper>

      <Divider py="xs" />
      <Group justify="right">
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          leftSection={<IoRocketSharp />}
          onClick={() => {
            setVisible("premium")(true);
            gaEvent("Account Modal", "click upgrade premium");
          }}
        >
          Upgrade to Premium
        </Button>
        <Button
          color="red"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          Log Out
        </Button>
      </Group>
    </Modal>
  );
};
